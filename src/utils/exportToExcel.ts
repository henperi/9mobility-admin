import fileSaver from 'file-saver';

import httpService from '../services/htttpService';
import { logger } from './logger';

export const exportToExcel = (
  url: string,
  fileName = 'file',
  extension = '.xlsx',
) => {
  httpService
    .get(url, { responseType: 'arraybuffer' })
    .then((response) => {
      const blob = new Blob([response.data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      logger.log('blob', blob);

      fileSaver.saveAs(blob, fileName + extension);
    })
    .catch((e) => logger.log(e));
};
