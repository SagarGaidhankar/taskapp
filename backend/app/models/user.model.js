module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      firstname: String,
      lastname: String,
      email: String,
      region: String,
      AccountingFirm: String,
      AccountantsName: String,
      AccountantsPhone: String,
      AccountantsEmail: String,
      PurposeOfLoan: String,
      Status: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
