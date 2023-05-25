"use client";

import Modal from "@/app/components/Modal";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

/**
 * ImageModal component renders a modal dialog displaying an image.
 * @param {ImageModalProps} props - The props object containing isOpen, onClose, and src.
 * @returns {JSX.Element | null} The ImageModal component or null if src is not provided.
 */
const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <AspectRatio ratio={16 / 9}>
          <Image
            fill
            alt='Image'
            src={src}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-contain	'
          />
        </AspectRatio>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
