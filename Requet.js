const address = "https://abf1-88-166-102-138.ngrok-free.app";
const requets = {
  fetchLogin: address + "/api/v1/users/login",
  fetchBorrow: address + "/api/v1/books/",
  fetchBookUser: address + "api/v1/book",
  getBox: address + "/api/v1/box",
  fetchBookName: address + "/api/v1/book/search/",
  getImage: address + "/uploads/image/",
  getAvatar: address + "/uploads/image/avatar/",
  getBorrowUser: address + "/api/v1/book/user/",
};
export default requets;
