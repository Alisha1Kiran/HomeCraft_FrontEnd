const getGuestId = () => {
    let guestId = localStorage.getItem("guest_id");
    if (!guestId) {
      guestId = crypto.randomUUID(); // Generate unique guest_id
      localStorage.setItem("guest_id", guestId);
    }
    return guestId;
  };
  
  export default getGuestId;
  