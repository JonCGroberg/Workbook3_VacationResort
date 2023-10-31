// import { getRoomRate, rooms, daysBetween} from "./calculations.js";

// Html elements
const form = document.getElementById("quoteForm");
const elements = {
  inputs: {
    checkInDate: document.getElementById("checkIn"),
    checkOutDate: document.getElementById("checkOut"),
    adults: document.getElementById("adults"),
    children: document.getElementById("children"),
    roomType: document.getElementsByName("roomType"),
    discounts: document.getElementsByName("discounts"),
  },
  outputs: {
    quote: document.getElementById("quote"),
    numOfNights: document.getElementById("numOfNights"),
  },
};
const data = {
  rooms: {
    queen: { occupancy: 5, summerRate: 250, normalRate: 150 },
    king: { occupancy: 2, summerRate: 250, normalRate: 150 },
    twoBedroomSuite: { occupancy: 6, summerRate: 350, normalRate: 210 },
  },
  summerDates: { startDate: 6, endDate: 8 },
  discounts: { senior: 0.1, military: 0.2 },
  taxRate: 0.12,
};

//Functions
function getRoomRate(checkInMonth, roomType) {
  if (checkInMonth >= 6 && checkInMonth <= 8) return roomType.summerRate;
  else return roomType.normalRate;
}

function daysBetween(firstDate, secondDate) {
  const timeDiff = secondDate - firstDate;
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24); //milis->secs->mins->-hrs->days
  return dayDiff > 0 ? dayDiff : 1;
}

function calculate(room) {
  const startDate = new Date(elements.inputs.checkInDate.value);
  const endDate = new Date(elements.inputs.checkOutDate.value);
  const month = startDate.getMonth();
  let nights = daysBetween(startDate, endDate);
  let price = getRoomRate(month, room);
  let discount = .0;
  let discountedPrice = price - price * discount;
  let totalPrice = discountedPrice * nights;
  let tax = totalPrice * data.taxRate;
  let totalCost = totalPrice + tax;
  let totalSaved = totalCost - price * nights;
  let quote = `$${price.toFixed(2)} per Day
Tax: $${tax.toFixed(2)}
Total Cost: $${totalCost.toFixed(2)}`;

  return { nights, quote };
}

//Event Listeners
form.addEventListener("submit", (event) => {
  if (form.checkValidity()) {
    event.stopPropagation();
  }
  event.preventDefault();
  form.classList.add("was-validated");
});
addEventListener("input", (event) => {
  if (form.checkValidity()) {
    const selectedRoom = document.querySelector(
      'input[name="roomType"]:checked'
    );
    const outputData = calculate(data.rooms[selectedRoom.id]);

    elements.outputs.numOfNights.innerHTML = outputData.nights;
    elements.outputs.quote.innerHTML = outputData.quote;
  }
});

[adults, children].forEach((range) => {
  range.addEventListener("change", () => {
    let numberSpan = range.previousElementSibling.children[0];
    numberSpan.innerHTML = range.value;

    elements.inputs.roomType.forEach((room) => {
      if (
        Number(adults.value) + Number(children.value) <
        data.rooms[room.id].occupancy
      ) {
        room.disabled = false;
        room.previousElementSibling.classList.remove(
          "text-muted",
          "text-decoration-line-through"
        );
      } else {
        room.disabled = true;
        room.previousElementSibling.classList.add(
          "text-muted",
          "text-decoration-line-through"
        );
      }
    });
  });
});
