console.error("Error: user not found in database");

console.warn("Warning: password is too weak");

console.info("Info: server connected on port 8080");

console.table([
    { id: 101, product: "Laptop", price: 1200 },
    { id: 102, product: "Mouse", price: 25 },
    { id: 103, product: "Keyboard", price: 75 },
]);

console.time("mathTest");
let sum = 0;
for (let i = 1; i <= 100000; i++) {
    sum += i;
}
console.timeEnd("mathTest");

let isAdult = 15 >= 18;
console.assert(isAdult, "Assertion failed: age must be >= 18");

console.group("Login process");
console.log("Step 1: User entered email");
console.log("Step 2: User entered password");
console.log("Step 3: User clicked login");
console.groupEnd();

console.count("message sent");
console.count("message sent");
console.count("message sent");
console.countReset("message sent");
console.count("message sent");
