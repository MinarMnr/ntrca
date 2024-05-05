const RowSerial = (meta, index) => {
  return meta.currentPage !== 1
    ? meta.size * (meta.currentPage - 1) + index + 1
    : index + 1;
};

export default RowSerial;
