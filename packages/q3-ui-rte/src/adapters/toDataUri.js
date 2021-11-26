export default (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.addEventListener(
      'load',
      () => {
        resolve(reader.result);
      },
      false,
    );

    const blob = file?.src?.file;

    if (
      blob &&
      /\.(jpe?g|png|gif|svg|webp)$/i.test(blob?.name)
    ) {
      reader.readAsDataURL(blob);
    } else {
      reject(file);
    }
  });
};
