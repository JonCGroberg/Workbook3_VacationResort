// import { getRoomRate, rooms, daysBetween} from "./calculations.js";

// const date = new Date("10/30/23");
// const endDate = new Date("11/5/23");
// const month = date.getMonth();
// let room = rooms.king;
// let days = daysBetween(date, endDate);

// console.log(days);
// console.log(getRoomRate(month, room));

// const firstName = document.getElementById("firstName");
// const lastName = document.getElementById("lastName");
// const email = document.getElementById("email");
const form = document.getElementById("quoteForm");
const inputs = {
  checkInDate: document.getElementById("checkIn"),
  checkOutDate: document.getElementById("checkOut"),
  adults: document.getElementById("adults"),
  children: document.getElementById("children"),
  roomType: document.getElementsByName("roomType"),
  discounts: document.getElementsByName("discounts"),
};
const outputs = {
  quote: document.getElementById("quote"),
  numOfNights: document.getElementById("numOfNights"),
};
const rooms = {
  queen: { occupancy: 5, summerRate: 250, normalRate: 150 },
  king: { occupancy: 2, summerRate: 250, normalRate: 150 },
  twoBedroomSuite: { occupancy: 6, summerRate: 350, normalRate: 210 },
};
const summerDates = { startDate: 6, endDate: 8 }; //Jun - Aug
const discounts = { senior: 0.1, military: 0.2 };
const taxRate = 0.12;

function getRoomRate(checkInMonth, roomType) {
  if (checkInMonth >= 6 && checkInMonth <= 8) return roomType.summerRate;
  else return roomType.normalRate;
}
function daysBetween(firstDate, secondDate) {
  const timeDiff = secondDate - firstDate;
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24); //milis->secs->mins->-hrs->days
  return dayDiff > 0 ? dayDiff:1;
}

form.addEventListener("submit", (event) => {
  if (form.checkValidity()) {
    event.stopPropagation();
  }
  event.preventDefault();
  form.classList.add("was-validated");
});

addEventListener("input", (event) => {
  if (form.checkValidity()) {
    let selectedRoom = document.querySelector('input[name="roomType"]:checked');
    calculate(rooms[selectedRoom.id]);
  }
});

// let selectedRoom;

// inputs.roomType.forEach((room) =>
//   room.addEventListener("change", () => {
//     if (form.checkValidity()) calculate(rooms[room.id]);
//   })
// );

function calculate(room) {
  const startDate = new Date(inputs.checkInDate.value);
  const endDate = new Date(inputs.checkOutDate.value);
  const month = startDate.getMonth();
  let nights = daysBetween(startDate, endDate);
  console.log(nights);
  outputs.numOfNights.innerHTML = nights;

  let price = getRoomRate(month, room);
  let discount = discounts.military;
  let discountedPrice = price - price * discount;
  let totalPrice = discountedPrice * nights;
  let tax = totalPrice * taxRate;
  let totalCost = totalPrice + tax;
  let totalSaved = totalCost - price * nights;

  outputs.quote.innerHTML = `Per Night: $${price.toFixed(2)}
Discount: ${discount*100}%
Tax: $${tax.toFixed(2)}
Total Cost: $${totalCost.toFixed(2)}`;
}
