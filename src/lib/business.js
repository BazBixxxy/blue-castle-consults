// src/lib/business.js
export const business = {
  name: "Blue Castle Consults",
  shortName: "Blue Castle",
  phone: "256775949520", // wa.me format: country code + number, no + or spaces
  phoneDisplay: "+256 775 949 520",
  email: "", // not provided — Contact section omits this row until filled in
  address: "The Plaza, Kampala Road, 1st Floor, Suite 09, Kampala, Uganda",
  // Placeholder coordinates — approximate central Kampala Road only.
  // Replace with the exact pin for The Plaza before launch:
  // right-click the building on Google Maps → copy the coordinates shown.
  coordinates: { lat: 0.3144, lng: 32.5811 },
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
    { days: "Saturday", time: "9:00 AM – 3:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  socials: { instagram: "", facebook: "", tiktok: "" },
};
