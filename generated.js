function Deneme(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
}
Deneme.prototype.method1 = function (a,b,c) {
  return this.a + this.b + this.c;
};