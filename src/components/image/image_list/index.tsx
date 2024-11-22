"use client";
import React from 'react';
import Image from 'next/image';

type ImageListProps = {
    onSelect: (id: number,src: string) => void;
};

export function ImageList({ onSelect }: ImageListProps) {
    const images = [
        { id: 1, src: '/images/profile_icon/buta.png', alt: 'ぶた' },
        { id: 2, src: '/images/profile_icon/gorira.png', alt: 'ゴリラ' },
        { id: 3, src: '/images/profile_icon/kitune.png', alt: 'きつね' },
        { id: 4, src: '/images/profile_icon/panda.png', alt: 'ぱんだ' },
        { id: 5, src: '/images/profile_icon/pengin.png', alt: 'ペンギン' },
        { id: 6, src: '/images/profile_icon/raion.png', alt: 'らいおん' }
    ];

    return (
        <div className="flex space-x-4">
            {images.map((image) => (
                <Image
                    key={image.id}
                    src={image.src}
                    alt={image.alt}
                    width={100}   // サムネイルサイズを指定
                    height={100}
                    className="rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500"
                    onClick={() => onSelect(image.id, image.src)}
                />
            ))}
        </div>
    );
}

