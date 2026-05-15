"use client";

import { useCallback, useRef } from "react";
import { set, useClient } from "sanity";
import type { ArrayOfObjectsInputProps } from "sanity";

export function MultiImageUpload(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange, renderDefault } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use Sanity's authenticated client instead of importing yours
  const client = useClient({ apiVersion: "2024-01-01" });

  const handleFiles = useCallback(
    async (files: FileList) => {
      const uploads = await Promise.all(
        Array.from(files).map((file) =>
          client.assets.upload("image", file, {
            filename: file.name,
          })
        )
      );

      const newItems = uploads.map((asset) => ({
        _type: "image",
        _key: Math.random().toString(36).slice(2),
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      }));

      onChange(set([...(value as any[]), ...newItems]));
    },
    [value, onChange, client]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "6px",
          padding: "24px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "16px",
          background: "#fafafa",
          transition: "border-color 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.borderColor = "#0066cc")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.borderColor = "#ccc")
        }
      >
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
          📁 Click or drag & drop to upload <strong>multiple images</strong> at once
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFiles(e.target.files);
              e.target.value = "";
            }
          }}
        />
      </div>

      {renderDefault(props)}
    </div>
  );
}