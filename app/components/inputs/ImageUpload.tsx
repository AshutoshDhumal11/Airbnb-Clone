"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

export function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = useCallback(
    (result: any) => {
      const url = result?.info?.secure_url || result?.secure_url;
      onChange(url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="Airbnb"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0">
                <Image
                  src={value}
                  alt="Uploaded Image"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
