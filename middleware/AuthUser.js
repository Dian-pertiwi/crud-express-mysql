// import User from "../models/UserModel.js";

// //Midleware ini berfungsi melakukan login terlebih dahulu sebelum melakukan crud data
// export const verifyUser = async (req, res, next) => {
//   if (!req.session.userId) {
//     return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
//   }
//   const user = await User.findOne({
//     where: {
//       uuid: req.session.userId,
//     },
//   });
//   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//   req.userId = user.id;
//   req.role = user.role;
//   next();
// };

// export const adminOnly = async (req, res, next) => {
//   const user = await User.findOne({
//     where: {
//       uuid: req.session.userId,
//     },
//   });
//   //vallidasi
//   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//   if (user.role !== "admin")
//     return res.status(403).json({ msg: "Akses terlarang" });
//   next();
// };

import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    const user = await User.findOne({
      where: {
        uuid: req.session.userId,
      },
    });
    if (!user) {
      console.log(`User dengan UUID ${req.session.userId} tidak ditemukan`);
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    req.userId = user.id;
    req.role = user.role;
    console.log(`User ditemukan: ${user.id}, Role: ${user.role}`);
    next();
  } catch (error) {
    console.error(`Error dalam verifyUser: ${error.message}`);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.session.userId,
      },
    });
    if (!user) {
      console.log(`User dengan UUID ${req.session.userId} tidak ditemukan`);
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    if (user.role !== "admin") {
      console.log(`Akses terlarang untuk user: ${user.id}, Role: ${user.role}`);
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    next();
  } catch (error) {
    console.error(`Error dalam adminOnly: ${error.message}`);
    res.status(500).json({ msg: "Internal server error" });
  }
};
