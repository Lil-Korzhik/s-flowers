import fs from 'fs';
import {v4} from 'uuid';
import path from 'path';

class FileService {
    saveFile(file, folder) {
        try {
            const fileName = v4() + '.' + file.name.split('.')[1];
            const filePath = path.resolve(`static/${folder}`, fileName);
            file.mv(filePath);

            return fileName;
        } catch (e) {
            console.error(e);
        }
    }

    removeFile(fileName, folder) {
        const filePath = path.resolve(`static/${folder}/${fileName}`);
        fs.unlinkSync(filePath);
    }
}

export default new FileService();