const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  username: {type: String, unique: true, required: false, lowercase: true},
  password: {type: String, required: false},
  name: {type: String, required: false},
  email: {type: String, required: true, unique: true, lowercase: true},
  gender: {type: String, enum: ['hombre','mujer','otro'], lowercase:true}, //Needs to be capitalized in the form.
  age: {type: Number, required: false},
  schedule: {type: String, required: false},
  role: {type: Number, required: true; default: 1}, //1: Usuario. 2: administrativo, 3: mensajero.
  country: {type: String, },

  users: [{}]
});

UserSchema.pre('save', function (next) {
    const user = this;
  
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (error, salt) => {
        if (error) return next(error);
  
        bcrypt.hash(user.password, salt, (error, hash) => {
          if (error) return next(error);
  
          user.password = hash;
          next();
        });
      });
    } else return next();
  });
  
  UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, matches) => {
      if (error) return callback(error);
      callback(null, matches);
    });
  };
  
  mongoose.model('User', UserSchema);