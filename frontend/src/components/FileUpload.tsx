import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  maxFiles = 5,
  acceptedFileTypes = ['image/*', 'application/pdf', '.doc', '.docx'],
  maxSize = 5242880, // 5MB
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(file => file.errors[0].message).join(', ');
      setErrorMessage(errors);
      setUploadStatus('error');
      return;
    }

    if (uploadedFiles.length + acceptedFiles.length > maxFiles) {
      setErrorMessage(`You can only upload a maximum of ${maxFiles} files.`);
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      const newFiles = [...uploadedFiles, ...acceptedFiles];
      setUploadedFiles(newFiles);
      onFileUpload(newFiles);
      setUploadStatus('success');
    }, 1500);
  }, [uploadedFiles, maxFiles, onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    maxFiles,
  });

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    onFileUpload(newFiles);
  };

  return (
    <div className="w-full">
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select files'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Accepted file types: {acceptedFileTypes.join(', ')} (Max: {maxFiles} files, {maxSize / 1024 / 1024}MB each)
        </p>
      </motion.div>

      {uploadStatus === 'uploading' && (
        <motion.div 
          className="mt-4 p-3 bg-blue-50 rounded-md flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mr-3 flex-shrink-0">
            <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-blue-700">Uploading files...</p>
        </motion.div>
      )}

      {uploadStatus === 'error' && (
        <motion.div 
          className="mt-4 p-3 bg-red-50 rounded-md flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="mr-3 h-5 w-5 text-red-500" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </motion.div>
      )}

      {uploadStatus === 'success' && (
        <motion.div 
          className="mt-4 p-3 bg-green-50 rounded-md flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
          <p className="text-sm text-green-700">Files uploaded successfully!</p>
        </motion.div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files</h4>
          <ul className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <motion.li 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <File className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;