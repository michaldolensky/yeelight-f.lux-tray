import {nativeImage} from 'electron';

export const getMenuIcon = (fileName: string) => {
    const iconSize = 45;
    return getIcon(fileName).resize({height: iconSize});
};
export const getIcon = (fileName: string) => {
    return nativeImage.createFromPath(process.resourcesPath + '/icons/' + fileName);
};
