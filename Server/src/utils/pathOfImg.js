import fs from 'fs'

export const ulrImage = (file) =>{
    const arrayPath = file.path.split('\\')
    const nameImg = arrayPath.pop()
    const folderImg = arrayPath.pop()
    // const pathToSave = `${folderImg}/${nameImg}`
    const pathToSave = `${nameImg}`
    return pathToSave
}
export const deletelinkFile = ({path}) =>{
    try {
        if(!path) throw new Error('there is not image to delete')
        fs.unlinkSync(`src/uploads/users/${path}`)
    } catch (error) {
        console.error(error)
    }
}