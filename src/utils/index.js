/**
 * Функция для преобразования байтов в 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
 * @param {number} bytes - ссылка к картинке
 * @param {number} decimals - кол-во нулей после запятой
 * @param {string} unit - преобразование к какой единице измерения: 'KB','MB','GB','TB','PB','EB','ZB','YB'. Иначе вычисляется наиболее подходящий вариант
 * @return {string} возвращает стоку в новом формате
 */
function formatBytes(bytes, decimals = 2, unit = "") {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = unit
    ? sizes.indexOf(unit)
    : Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
/**
 * Асинхронная функция для преобразования Объект Blob
 * @param {string} imageSrc - ссылка к картинке
 * @return {Promise} Объект Image Blob
 */

async function createImageBlog(imageSrc) {
  const IMG_TYPE = "image/jpeg";
  try {
    const data = await fetch(imageSrc);
    const BlobObj = await data.blob();
    if (BlobObj.type === IMG_TYPE) {
      return BlobObj;
    } else {
      throw new Error("Url is not valid");
    }
  } catch (e) {
    throw e;
  }
}

/**
 * Асинхронная функция для скачивания картинок
 * @param {string} imageSrc - ссылка к картинке
 * @param {string} imgName - с каким названием будет скачена картинка
 */
async function downloadImg(imageSrc, imgName = "image") {
  const imageBlog = await createImageBlog(imageSrc);
  const imageURL = URL.createObjectURL(imageBlog);
  const link = document.createElement("a");
  link.href = imageURL;
  link.download = imgName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Функция добавляет поле "size" для каждого элемента массива (API не передает размер документа, поэтому высчитываем самостоятельно)
 * @param {Array} documents - массив с документами
 * @return {Promise} возвращает новый массив с добавленным полем "size"
 */
const addSizeToDocuments = (documents) => {
  const documentsWithSize = documents.map(async (item) => {
    try {
      // item.size = formatBytes(imageBlog.size, 3, 'MB')
      const imageBlog = await createImageBlog(item.image);
      item.size = formatBytes(imageBlog.size);
    } catch (e) {
      console.error(`${e} in ${item.name}`);
    } finally {
      return item;
    }
  });
  return Promise.all(documentsWithSize);
};

export { addSizeToDocuments, downloadImg, formatBytes };
