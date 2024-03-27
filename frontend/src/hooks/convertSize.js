const convertSize = (fileSizeInBytes) => {
        const fileSizeInKB = fileSizeInBytes / 1024;
        const fileSizeInMB = fileSizeInKB / 1024;
        const fileSizeInGB = fileSizeInMB / 1024;
        let size;
        if (fileSizeInKB <= 1024) {
          size = (Math.round(fileSizeInKB) < 1 ? 1 : Math.round(fileSizeInKB)) + 'kb';
        }
        else if (fileSizeInMB <= 1024) {
          size = Math.round(fileSizeInMB) + 'Mb';
        }
        else if (fileSizeInGB <= 1024) {
          size = Math.round(fileSizeInGB) + 'Gb';
        }
        return size;
      
}

export default convertSize
