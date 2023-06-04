import AWS from 'aws-sdk';

const bucketName = 'hes-otomotiv';
const region = 'eu-central-1';
const accessKeyId = "AKIA2AWUE35BJ6ZQK2LJ";
const secretAccessKey = "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";

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
});

const s3 = new AWS.S3();

export default s3;