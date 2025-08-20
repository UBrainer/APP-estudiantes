-- CreateTable
CREATE TABLE "public"."estudiantes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "documento" VARCHAR(50) NOT NULL,
    "correo" VARCHAR(150) NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "estado" BOOLEAN DEFAULT true,
    "creado_en" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_documento_key" ON "public"."estudiantes"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_correo_key" ON "public"."estudiantes"("correo");
