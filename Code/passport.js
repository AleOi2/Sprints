const { Users, PredictCategory, Category } = require('./Sequelize/model/');
let passport = require('passport');
let { safeAccess } = require("./utils/safeAcces")
let { 
    secret, 
    clientID, 
    clientSecret,
    facebookClientID, 
    facebookclientSecret
} = require('./constants/constants')
const insertInitialCategoriesPrediction = require('./utils/initialPredicition')
const md5 = require('md5');
const bcrypt = require('bcrypt')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = process.env.SECRET || secret;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    Users.findAll({
        where: {
            id: jwt_payload.id
        }
    }).then(user => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
        .catch((err) => {
            return done(err, false);

        })
}));

const CustomStrategy = require('passport-custom').Strategy;

passport.use('custom', new CustomStrategy(
    async (req, done) => {
        if (req.body.key === '123') done(null, true);
        else done(null, false)
    }
));

var GoogleStrategy = require('passport-google-oauth20').Strategy;
// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "/usuarios/auth/google/callback"
},
    function (token, tokenSecret, profile, done) {
        const now = new Date();

        Users.findOne({
            where: {
                email: profile.emails[0].value
            },
        }).then(user => {
            if (!user) {
                let newUser = {
                    name: profile.name.givenName,
                    surname: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: bcrypt.hashSync(md5(profile.id), 10),
                    createdAt: now,
                }

                Users.create(newUser).then(async (res) => {
                    await insertInitialCategoriesPrediction(res.dataValues.id);
                    return done(null, {...newUser, id: res.dataValues.id});
                })
            } else {
                return done(null, user.dataValues);
            }
        }).catch(err => done(err, false))
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Users.findByPk(id).then((user, err) => {
        done(err, user.dataValues);
        // if(user) done(err, user.dataValues);
        // done(err,{})
    })
});


var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: facebookClientID,
    clientSecret: facebookclientSecret,
    callbackURL: "/usuarios/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    const now = new Date();
    Users.findOne({
        where: {
            email: profile.provider + profile.id + '@gmail.com'
        },
    }).then(user => {
        if (!user) {    
            let newUser = {
                name: profile.displayName,
                surname: profile.name.familyName || '',
                email: profile.provider + profile.id + '@gmail.com',
                password: bcrypt.hashSync(md5(profile.id), 10),
                createdAt: now,
            }

            Users.create(newUser).then((res) => {
                insertInitialCategoriesPrediction(res.dataValues.id);
                return done(null, {...newUser, id: res.dataValues.id});
            })
        } else {
            return done(null, user.dataValues);
        }
    }).catch(err => done(err, false))
   }
));