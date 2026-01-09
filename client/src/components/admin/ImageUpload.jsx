import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ImageUpload = ({ value, onChange, label = "Upload Image" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value);
    const fileInputRef = useRef(null);
    const { toast } = useToast();

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast({ title: "Error", description: "Please upload a valid image (JPEG, PNG, WEBP)", variant: "destructive" });
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB
            toast({ title: "Error", description: "Image size must be less than 5MB", variant: "destructive" });
            return;
        }

        // Create local preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);

            const fullPath = `http://localhost:5000${data.filePath}`;
            onChange(fullPath);
            toast({ title: "Success", description: "Image uploaded successfully" });
        } catch (error) {
            console.error('Upload error:', error);
            toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
            setPreview(value); // Revert preview on failure
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation(); // Prevent triggering click on parent container
        setPreview('');
        onChange('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">{label}</label>

            <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                    relative group cursor-pointer 
                    border-2 border-dashed border-border rounded-xl 
                    p-4 transition-all duration-200
                    hover:border-primary/50 hover:bg-muted/50
                    flex flex-col items-center justify-center
                    min-h-[200px]
                    ${preview ? 'border-primary' : ''}
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={uploading}
                />

                {uploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl z-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : null}

                {preview ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-[180px] rounded-md object-contain shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full shadow-md hover:bg-destructive/90 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <div className="p-3 rounded-full bg-secondary">
                            <Upload className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium">Click to upload</p>
                            <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
