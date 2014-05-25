using System;
using System.IO;
using System.Web;

namespace H724._Helpers
{
    public static class FileUploadHelper
    {
        public static ImageUpload UploadFile(HttpPostedFileBase file, string path)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileInfo = new FileInfo(file.FileName);
                var fileName = Guid.NewGuid() + fileInfo.Extension;
                var uploadPath = Path.Combine(path, fileName); 
                file.SaveAs(uploadPath);
                var imageUpload = new ImageUpload { ContentType = file.ContentType, FileName = fileName, Path = uploadPath, Size = file.ContentLength };
                return imageUpload;
            }

            return null;
        }
    }
}