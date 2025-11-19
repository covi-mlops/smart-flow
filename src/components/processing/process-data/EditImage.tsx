"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
// 목데이터
// TODO: API 연동 시 수정
const INITIAL_MASK_POLY = [
    [
        // 아래 핀
        [122, 335], [120, 337], [121, 338], [119, 340], [102, 340],
        [100, 342], [101, 343], [99, 345], [87, 345], [85, 347],
        [86, 348], [84, 350], [67, 350], [65, 352], [66, 353],
        [64, 355], [7, 355], [5, 357], [6, 358], [6, 361],
        [5, 362], [6, 363], [6, 366], [5, 367], [6, 368],
        [6, 371], [5, 372], [6, 373], [6, 376], [5, 377],
        [7, 379], [47, 379], [49, 377], [48, 376], [50, 374],
        [67, 374], [69, 372], [68, 371], [70, 369], [82, 369],
        [84, 367], [83, 366], [85, 364], [102, 364], [104, 362],
        [103, 361], [105, 359], [122, 359], [124, 357], [123, 356],
        [125, 354], [137, 354], [139, 352], [138, 351], [140, 349],
        [309, 349], [311, 351], [310, 352], [312, 354], [364, 354],
        [366, 356], [365, 357], [367, 359], [389, 359], [391, 361],
        [390, 362], [392, 364], [414, 364], [416, 366], [415, 367],
        [417, 369], [439, 369], [441, 371], [440, 372], [442, 374],
        [464, 374], [466, 376], [465, 377], [467, 379], [484, 379],
        [486, 381], [485, 382], [487, 384], [514, 384], [516, 386],
        [515, 387], [517, 389], [522, 389], [524, 387], [523, 386],
        [525, 384], [547, 384], [549, 382], [548, 381], [550, 379],
        [612, 379], [614, 377], [613, 376], [615, 374], [667, 374],
        [669, 372], [668, 371], [668, 368], [669, 367], [668, 366],
        [668, 363], [669, 362], [668, 361], [668, 358], [669, 357],
        [667, 355], [607, 355], [605, 357], [606, 358], [604, 360],
        [582, 360], [580, 362], [581, 363], [579, 365], [542, 365],
        [540, 367], [541, 368], [539, 370], [500, 370], [498, 368],
        [499, 367], [497, 365], [475, 365], [473, 363], [474, 362],
        [472, 360], [450, 360], [448, 358], [449, 357], [447, 355],
        [430, 355], [428, 353], [429, 352], [427, 350], [410, 350],
        [408, 348], [409, 347], [407, 345], [390, 345], [388, 343],
        [389, 342], [387, 340], [370, 340], [368, 338], [369, 337],
        [367, 335], [122, 335]
    ],
    // 위 핀
    [
        [7, 245], [5, 247], [6, 248], [6, 251], [5, 252],
        [6, 253], [6, 256], [5, 257], [6, 258], [6, 261],
        [5, 262], [7, 264], [49, 264], [51, 266], [50, 267],
        [52, 269], [69, 269], [71, 271], [70, 272], [72, 274],
        [89, 274], [91, 276], [90, 277], [92, 279], [104, 279],
        [106, 281], [105, 282], [107, 284], [124, 284], [126, 286],
        [125, 287], [127, 289], [144, 289], [146, 291], [145, 292],
        [147, 294], [367, 294], [369, 292], [368, 291], [370, 289],
        [387, 289], [389, 287], [388, 286], [390, 284], [407, 284],
        [409, 282], [408, 281], [410, 279], [432, 279], [434, 277],
        [433, 276], [435, 274], [452, 274], [454, 272], [453, 271],
        [455, 269], [482, 269], [484, 267], [483, 266], [485, 264],
        [549, 264], [551, 266], [550, 267], [552, 269], [594, 269],
        [596, 271], [595, 272], [597, 274], [609, 274], [611, 276],
        [610, 277], [612, 279], [667, 279], [669, 277], [668, 276],
        [668, 273], [669, 272], [668, 271], [670, 269], [672, 269],
        [674, 267], [672, 265], [670, 265], [668, 263], [669, 262],
        [667, 260], [660, 260], [658, 258], [659, 257], [657, 255],
        [605, 255], [603, 253], [604, 252], [602, 250], [545, 250],
        [543, 248], [544, 247], [542, 245], [492, 245], [490, 247],
        [491, 248], [489, 250], [462, 250], [460, 252], [461, 253],
        [459, 255], [437, 255], [435, 257], [436, 258], [434, 260],
        [412, 260], [410, 262], [411, 263], [409, 265], [387, 265],
        [385, 267], [386, 268], [384, 270], [362, 270], [360, 272],
        [361, 273], [359, 275], [175, 275], [173, 273], [174, 272],
        [172, 270], [130, 270], [128, 268], [129, 267], [127, 265],
        [115, 265], [113, 263], [114, 262], [112, 260], [95, 260],
        [93, 258], [94, 257], [92, 255], [80, 255], [78, 253],
        [79, 252], [77, 250], [60, 250], [58, 248], [59, 247],
        [57, 245], [7, 245]
    ]
];

interface Point {
    x: number;
    y: number;
    polygonIndex: number;
    pointIndex: number;
}

interface EditImageProps {
    onDataChange?: (data: number[][][]) => void;
}

export default function EditImage({ onDataChange }: EditImageProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const [maskPoly, setMaskPoly] = useState<number[][][]>(INITIAL_MASK_POLY);
    const [editedPoints, setEditedPoints] = useState<Set<string>>(new Set());
    const [isDragging, setIsDragging] = useState(false);
    const [draggedPoint, setDraggedPoint] = useState<Point | null>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

    const POINT_RADIUS = 4;
    const POINT_COLOR = "#00B71B";
    const EDITED_POINT_COLOR = "#C8000B";
    const POINT_HIT_RADIUS = 8;
    const MIN_SCALE = 0.6; // 60%까지 축소 가능
    const MAX_SCALE = 5; // 500%까지 확대 가능
    const ZOOM_STEP = 0.2; // 20% 간격으로 축소/확대

    useEffect(() => {
        // TODO: API 연동 시 이미지 경로 수정
        const image = new Image();
        image.src = "/assets/contactpin_ex_image.png";
        image.onload = () => {
            imageRef.current = image;
            setIsImageLoaded(true);
        };
    }, []);

    useEffect(() => {
        if (!isImageLoaded || !canvasRef.current || !imageRef.current || !containerRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const container = containerRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const image = imageRef.current;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;

        drawCanvas(ctx, image);
    }, [isImageLoaded, maskPoly, editedPoints, scale, offset]);

    useEffect(() => {
        if (onDataChange) {
            onDataChange(maskPoly);
        }
    }, [maskPoly, onDataChange]);

    useEffect(() => {
        // 이미지 zoom in/out 시 페이지 이동 방지
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const preventScroll = (e: WheelEvent) => {
            e.preventDefault();
        };

        container.addEventListener('wheel', preventScroll, { passive: false });

        return () => {
            container.removeEventListener('wheel', preventScroll);
        };
    }, []);

    const drawCanvas = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.save();
        ctx.translate(offset.x, offset.y);
        ctx.scale(scale, scale);

        const canvasWidth = ctx.canvas.width / scale;
        const canvasHeight = ctx.canvas.height / scale;
        const imgX = (canvasWidth - image.width) / 2;
        const imgY = (canvasHeight - image.height) / 2;

        ctx.drawImage(image, imgX, imgY);

        maskPoly.forEach((polygon, polygonIndex) => {
            if (polygon.length > 0) {
                ctx.beginPath();
                ctx.moveTo(imgX + polygon[0][0], imgY + polygon[0][1]);

                for (let i = 1; i < polygon.length; i++) {
                    ctx.lineTo(imgX + polygon[i][0], imgY + polygon[i][1]);
                }

                ctx.closePath();
                ctx.strokeStyle = POINT_COLOR;
                ctx.lineWidth = 2 / scale;
                ctx.stroke();

                ctx.fillStyle = `${POINT_COLOR}60`;
                ctx.fill();
            }

            polygon.forEach((point, pointIndex) => {
                const [x, y] = point;
                const pointKey = `${polygonIndex}-${pointIndex}`;
                const isEdited = editedPoints.has(pointKey);

                ctx.beginPath();
                ctx.arc(imgX + x, imgY + y, POINT_RADIUS / scale, 0, Math.PI * 2);
                ctx.fillStyle = isEdited ? EDITED_POINT_COLOR : POINT_COLOR;
                ctx.fill();
                ctx.strokeStyle = "#FFFFFF";
                ctx.lineWidth = 1 / scale;
                ctx.stroke();
            });
        });

        const centerX = imgX + image.width / 2;
        const centerY = imgY + image.height / 2;

        ctx.strokeStyle = "#026F16";
        ctx.lineWidth = 2 / scale;
        ctx.setLineDash([5 / scale, 5 / scale]);

        ctx.beginPath();
        ctx.moveTo(centerX, imgY);
        ctx.lineTo(centerX, imgY + image.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(imgX, centerY);
        ctx.lineTo(imgX + image.width, centerY);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.restore();
    };

    const screenToImageCoords = (screenX: number, screenY: number) => {
        if (!canvasRef.current || !imageRef.current) {
            return { x: 0, y: 0 };
        }

        const canvas = canvasRef.current;
        const image = imageRef.current;
        const canvasWidth = canvas.width / scale;
        const canvasHeight = canvas.height / scale;
        const imgX = (canvasWidth - image.width) / 2;
        const imgY = (canvasHeight - image.height) / 2;

        const imageX = (screenX - offset.x) / scale - imgX;
        const imageY = (screenY - offset.y) / scale - imgY;

        return { x: imageX, y: imageY };
    };

    const findPointAtPosition = (x: number, y: number): Point | null => {
        const { x: imgX, y: imgY } = screenToImageCoords(x, y);

        for (let polygonIndex = 0; polygonIndex < maskPoly.length; polygonIndex++) {
            const polygon = maskPoly[polygonIndex];
            for (let pointIndex = 0; pointIndex < polygon.length; pointIndex++) {
                const [px, py] = polygon[pointIndex];
                const distance = Math.sqrt((imgX - px) ** 2 + (imgY - py) ** 2);
                if (distance <= POINT_HIT_RADIUS / scale) {
                    return { x: px, y: py, polygonIndex, pointIndex };
                }
            }
        }
        return null;
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (e.button === 1 || e.shiftKey) {
            setIsPanning(true);
            setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
            return;
        }

        const point = findPointAtPosition(x, y);
        if (point) {
            setIsDragging(true);
            setDraggedPoint(point);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isPanning) {
            setOffset({
                x: e.clientX - panStart.x,
                y: e.clientY - panStart.y
            });
            return;
        }

        if (!isDragging || !draggedPoint || !canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;

        const { x: imgX, y: imgY } = screenToImageCoords(screenX, screenY);

        setMaskPoly(prev => {
            const newMaskPoly = prev.map((polygon, polygonIndex) => {
                if (polygonIndex === draggedPoint.polygonIndex) {
                    return polygon.map((point, pointIndex) => {
                        if (pointIndex === draggedPoint.pointIndex) {
                            return [Math.round(imgX), Math.round(imgY)];
                        }
                        return point;
                    });
                }
                return polygon;
            });
            return newMaskPoly;
        });

        setDraggedPoint(prev => prev ? { ...prev, x: imgX, y: imgY } : null);
    };

    const handleMouseUp = () => {
        if (isDragging && draggedPoint) {
            const pointKey = `${draggedPoint.polygonIndex}-${draggedPoint.pointIndex}`;
            setEditedPoints(prev => new Set(prev).add(pointKey));
        }
        setIsDragging(false);
        setDraggedPoint(null);
        setIsPanning(false);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
        setIsPanning(false);
    };

    const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
        setScale(newScale);
    };

    const handleZoomIn = () => {
        setScale(prev => Math.min(MAX_SCALE, prev + ZOOM_STEP));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(MIN_SCALE, prev - ZOOM_STEP));
    };

    const handleResetZoom = () => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
    };

    const handleMoveToLeft = () => {
        if (!imageRef.current || !canvasRef.current) {
            return;
        }
        const image = imageRef.current;
        const scaledWidth = image.width * scale;
        const moveX = scaledWidth / 4;
        setOffset({ x: moveX, y: offset.y });
    };

    const handleMoveToRight = () => {
        if (!imageRef.current || !canvasRef.current) {
            return;
        }
        const image = imageRef.current;
        const scaledWidth = image.width * scale;
        const moveX = -scaledWidth / 4;
        setOffset({ x: moveX, y: offset.y });
    };

    const handleMoveToCenter = () => {
        setOffset({ x: 0, y: offset.y });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3 bg-white border-[4px] border-light-gray p-4">
                <div className="flex items-center gap-3">
                    <Button
                        type="simple"
                        title="-"
                        disabled={scale <= MIN_SCALE}
                        onClick={handleZoomOut}
                    />
                    <span className="text-xl font-bold text-black min-w-[80px] text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button
                        type="simple"
                        title="+"
                        disabled={scale >= MAX_SCALE}
                        onClick={handleZoomIn}
                    />
                    <Button
                        type="default"
                        title="초기화"
                        disabled={false}
                        onClick={handleResetZoom}
                    />
                    <span className="text-base text-medium-gray ml-4">
                        Shift + 드래그 또는 마우스 휠로 확대/축소
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="default"
                        title="← 왼쪽"
                        disabled={false}
                        onClick={handleMoveToLeft}
                        className="w-[100px]"
                    />
                    <Button
                        type="default"
                        title="중앙"
                        disabled={false}
                        onClick={handleMoveToCenter}
                        className="w-[80px]"
                    />
                    <Button
                        type="default"
                        title="오른쪽 →"
                        disabled={false}
                        onClick={handleMoveToRight}
                        className="w-[100px]"
                    />
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex items-center justify-center border-[4px] border-light-gray bg-soft-white overflow-hidden"
                style={{ height: "800px" }}
                onWheel={(e) => e.preventDefault()}
            >
                <canvas
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onWheel={handleWheel}
                    className={isPanning ? "cursor-grabbing" : "cursor-crosshair"}
                />
            </div>
        </div>
    );
}
