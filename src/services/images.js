/**
 * Module imports
 *
 **/

const path = require('path')
const fs = require ('fs')

//import sharp from 'sharp'
const sharp = require('sharp')

const ImageUploadPath = process.env.IMAGE_UPLOAD_PATH
const thumbUploadPath = process.env.THUMBNAIL_UPLOAD_PATH
const portal = process.env.PORTAL

/**
 * Project imports
 *
 **/

let defaults = {}

class ImageService {
  constructor() {     
    // this.s3 = new AWS.S3({
    //     params: {
    //         Bucket: Config.get('/aws').bucket
    //     }
    // })
  }

uploadImage(fileName,inputBuffer,cb) {

        try {

            let fileDestination = path.resolve(__dirname, '../../../',ImageUploadPath);
            let saveTo = path.join(fileDestination, fileName);

            sharp(inputBuffer)
            .toFile(saveTo, (err, info) => {
              if(err) {
                cb(err, null)
              }
              else{
                let imageUrl = `${portal}/uploads/${fileName}`
                cb(null,imageUrl)
              }

            })

        }
        catch(err) {
          cb(err, null)
        }
}




uploadThumbnails(fileName,inputBuffer,cb) {

        try {

            let fileDestination = path.resolve(__dirname, '../../../',thumbUploadPath);
            let saveTo = path.join(fileDestination, fileName);

            sharp(inputBuffer)
            .resize(250)
            .png()
            .toFile(saveTo, (err, info) => {
              if(err) {
                cb(err, null)
              }
              else{
                let imageUrl = `${portal}/uploads/thumbnails/${fileName}`
                console.log('imageUrl ======>>> ', imageUrl)
                cb(null,imageUrl)
              }

            })

        }
        catch(err) {
          cb(err, null)
        }
}



deleteImage(fileName, cb) {

	    try {

        	let fileDestination = path.resolve(__dirname, '../../../',ImageUploadPath);
          let savedImgName = fileName.split('/').pop();
          let fullPath = path.join(fileDestination, savedImgName);

          fs.unlink(fullPath,function(err){
		        if(err) {
		          cb(err, null)
		        }
		        else {
                  cb(null,'success')
		        }
	        })

	    }
	    catch(err) {
	      cb(err, null)
	    }

  }

deleteThumbnail(fileName, cb) {

      try {

          let fileDestination = path.resolve(__dirname, '../../../',thumbUploadPath);
          let savedImgName = fileName.split('/').pop();
          let fullPath = path.join(fileDestination, savedImgName);

          fs.unlink(fullPath,function(err){
            if(err) {
              cb(err, null)
            }
            else {
                  cb(null,'success')
            }
          })

      }
      catch(err) {
        cb(err, null)
      }

  }

}

module.exports = ImageService
