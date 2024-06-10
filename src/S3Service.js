// S3Service.js
import { S3 } from 'aws-sdk';

export const fetchFiles = (bucketName, callback) => {
  const params = {
    Bucket: bucketName
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error('Error fetching files:', err);
      callback(err, null);  // 오류 발생 시 콜백으로 오류 정보 전달
    } else {
      callback(null, data); // 성공 시 데이터 전달
    }
  });
};