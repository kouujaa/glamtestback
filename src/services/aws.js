// import fs from 'fs'
// import _ from 'lodash'
// import AWS from 'aws-sdk'

const fs = require("fs");
const _ = require("lodash");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

const s3 = new AWS.S3({
  params: {
    Bucket: process.env["BUCKET_NAME"]
  }
});

module.exports = uploadImage = async (request, reply) => {
  try {
    return new Promise(async (resolve, reject) => {
      let originalBlobArray = _.get(request, "imagePreviewUrl", "").split(",");
      const fileContent = Buffer.from(originalBlobArray[1], "base64");
      const KeyName = _.get(request, "name", "");
      const fileUploadResponse = await s3.upload(
        {
          Body: fileContent,
          Key: KeyName,
          ACL: "public-read"
        },
        (err, data) => {
          if (err) {
            reject({ message: err.message, data: {} });
          } else if (data) {
            console.log(data, "data");
            resolve({ message: "ok", data: data });
          }
        }
      );
    });
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: {}
    };
  }
};
