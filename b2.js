const validateDevice = (newDev) => {
  if (newDev.name === undefined || newDev.name === "") {
    return false;
  }

  if (newDev.room === undefined || newDev.room === "") {
    return false;
  }

  if (typeof newDev.powerWatts !== "number" || newDev.powerWatts <= 0) {
    return false;
  }

  return true;
};

// Them thiet bi
const createDevice = (list, newDev) => {
  if (!validateDevice(newDev)) {
    console.log("Du lieu thiet bi khong hop le");
    return false;
  }

  const device = {
    id: "DEV_" + (list.length + 1).toString().padStart(3, "0"),
    name: newDev.name,
    room: newDev.room,
    powerWatts: newDev.powerWatts,
    isActive: newDev.isActive === undefined ? true : newDev.isActive,
  };

  list.push(device);
  return device;
};

// Xem thiet bi theo phong
const readDevicesByRoom = (list, roomName) => {
  const result = [];

  for (let i = 0; i < list.length; i++) {
    if (list[i].room === roomName) {
      result.push(list[i]);
    }
  }

  return result;
};

// Cap nhat thiet bi
const updateDevice = (list, id, updateData) => {
  let targetDevice = null;

  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      targetDevice = list[i];
      break;
    }
  }

  if (targetDevice === null) {
    return false;
  }

  if (updateData.name !== undefined) {
    targetDevice.name = updateData.name;
  }

  if (updateData.room !== undefined) {
    targetDevice.room = updateData.room;
  }

  if (updateData.powerWatts !== undefined) {
    if (
      typeof updateData.powerWatts !== "number" ||
      updateData.powerWatts < 0
    ) {
      return false;
    }

    targetDevice.powerWatts = updateData.powerWatts;
  }

  if (updateData.isActive !== undefined) {
    targetDevice.isActive = updateData.isActive;
  }

  return true;
};

// Xoa thiet bi
const deleteDevice = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      return true;
    }
  }

  return false;
};

// Du lieu kiem thu
const devices = [];

console.log("1. Them thiet bi:");
console.log(
  createDevice(devices, {
    name: "Dieu hoa",
    room: "Phong khach",
    powerWatts: 1500,
  }),
);

console.log(
  createDevice(devices, {
    name: "Den ngu",
    room: "Phong ngu",
    powerWatts: 10,
  }),
);

console.log("2. Xem thiet bi phong ngu:");
console.log(readDevicesByRoom(devices, "Phong ngu"));

console.log("3. Cap nhat thiet bi:");
console.log(
  updateDevice(devices, "DEV_001", {
    isActive: false,
    powerWatts: 0,
  }),
);
console.log(devices);

console.log("4. Xoa thiet bi:");
console.log(deleteDevice(devices, "DEV_002"));
console.log(devices);

console.log("5. Tim ID khong ton tai:");
console.log(
  updateDevice(devices, "DEV_999", {
    isActive: true,
  }),
);
console.log(deleteDevice(devices, "DEV_999"));
