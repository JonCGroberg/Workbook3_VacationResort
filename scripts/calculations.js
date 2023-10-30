export { rooms, summerDates, discounts, tax, getRoomRate, daysBetween };

const rooms = {
  queen: { occupancy: 5, summerRate: 250, normalRate: 150 },
  king: { occupancy: 2, summerRate: 250, normalRate: 150 },
  twoBedroomSuite: { occupancy: 6, summerRate: 350, normalRate: 210 },
};
const summerDates = { startDate: 6, endDate: 8 }; //Jun - Aug
const discounts = { senior: 0.1, military: 0.2 };
const tax = 0.12;

function getRoomRate(checkInMonth, roomType) {
  if (checkInMonth >= 6 && checkInMonth <= 8) return roomType.summerRate;
  else return roomType.normalRate;
}
function daysBetween(firstDate, secondDate) {
  const timeDiff = secondDate - firstDate;
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24); //milis->secs->mins->-hrs->days
  return dayDiff > 0 ? dayDiff:1;
}



console.log(daysBetween(new Date("10/29/2023"),new Date("10/29/2023")));