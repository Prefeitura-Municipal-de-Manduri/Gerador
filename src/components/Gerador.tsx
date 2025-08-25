"use client";

import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as ExcelJS from "exceljs";
import { Plus, Trash2 } from "lucide-react";
import { FileText } from "lucide-react";

// Componentes UI (ShadCN-like)
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";



const Gerador = () => {
  const [formData, setFormData] = useState({
    responsavel: "",
    objeto: "",
    justificativa: "",
    localEntrega: "",
    ficha: "",
    valorEstimado: "",
    setor: "",
    itens: [{ quantidade: "", unidade: "Material", descricao: "" }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number | null = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedItens = [...formData.itens];
      updatedItens[index][name] = value;
      setFormData({ ...formData, itens: updatedItens });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      itens: [...formData.itens, { quantidade: "", unidade: "Material", descricao: "" }],
    });
  };

  const removeItem = (index: number) => {
    if (formData.itens.length > 1) {
      const updatedItens = formData.itens.filter((_, i) => i !== index);
      setFormData({ ...formData, itens: updatedItens });
    }
  };

  const resetForm = () => {
    setFormData({
      responsavel: "",
      objeto: "",
      justificativa: "",
      localEntrega: "",
      ficha: "",
      valorEstimado: "",
      setor: "",
      itens: [{ quantidade: "", unidade: "Material", descricao: "" }],
    });
  };

  const generateExcel = () => {
    const fileUrl = "/DFD_big.xlsx";

    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar arquivo: ${response.statusText}`);
        }
        return response.arrayBuffer();
      })
      .then((data) => {
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.load(data).then((wb) => {
          const worksheet = wb.getWorksheet(1);

          worksheet.pageSetup = {
            paperSize: ExcelJS.WS_PAPER_A4,
            fitToPage: true,
            fitToHeight: 3,
            fitToWidth: 1,
            orientation: "portrait",
            pageMargins: {
              top: 0.5,
              left: 0.5,
              bottom: 0.5,
              right: 0.5,
            },
          };

          worksheet.getRow(17).height = 2.35;

          worksheet.getCell("K4").value = formData.setor;
          worksheet.getCell("K5").value = formData.responsavel;
          worksheet.getCell("C11").value = formData.objeto;
          worksheet.getCell("C14").value = formData.justificativa;
          worksheet.getCell("J16").value = formData.ficha;
          worksheet.getCell("C94").value = formData.localEntrega;
          worksheet.getCell("C88").value = "R$ " + formData.valorEstimado;
          worksheet.getCell("F97").value = formData.responsavel;
          worksheet.getCell("F98").value = formData.setor;



          const today = new Date();
          const day = today.getDate();
          const monthNames = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
          ];
          const month = monthNames[today.getMonth()];
          const year = today.getFullYear();
          worksheet.getCell("C95").value = `Manduri, ${day} de ${month} de ${year}`;

          formData.itens.forEach((item, index) => {
            const row = 23 + index;
            if (row <= 82) {
              worksheet.getCell(`C${row}`).value = `Item ${String(index + 1).padStart(2, "0")}`;
              worksheet.getCell(`G${row}`).value = item.quantidade;
              worksheet.getCell(`J${row}`).value = item.unidade;
              worksheet.getCell(`K${row}`).value = item.descricao;
            }
          });

          const fileName = `DFD_${formData.setor}.xlsx`;
          wb.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer]), fileName);
            resetForm();
          });
        });
      })
      .catch((error) => {
        console.error("Erro ao gerar o arquivo:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        
        <Card className="!bg-blue-800 !border-blue-800">
          <CardHeader>
            <CardTitle className="!text-white text-center text-2xl">
              Prefeitura Municipal de Manduri
            </CardTitle>
            <p className="!text-white text-center text-sm">
              DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA - COMPRA DIRETA  </p>
          </CardHeader>
        </Card>

        {/* Informações da Demanda */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Demanda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="responsavel">Responsável pela Demanda</Label>
                <Input
                  id="responsavel"
                  name="responsavel"
                  value={formData.responsavel}
                  placeholder="Nome do responsável do Setor"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="setor">Setor</Label>
                <Input
                  id="setor"
                  name="setor"
                  value={formData.setor}
                  placeholder="Ex.: Departamento de Saúde"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="objeto">Objeto da Futura Contratação</Label>
              <Textarea
                id="objeto"
                name="objeto"
                value={formData.objeto}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="justificativa">Justificativa da Necessidade</Label>
              <Textarea
                id="justificativa"
                name="justificativa"
                value={formData.justificativa}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="localEntrega">Local de Entrega</Label>
                <Input
                  id="localEntrega"
                  name="localEntrega"
                  value={formData.localEntrega}
                  placeholder="Endereço de entrega"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="ficha">Ficha</Label>
                <Input
                  id="ficha"
                  name="ficha"
                  value={formData.ficha}
                  placeholder="Ficha orçamentária"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="valorEstimado">Valor Estimado  </Label>
                <Input
                  id="valorEstimado"
                  name="valorEstimado"
                  value={formData.valorEstimado}
                  placeholder="1500,00"

                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Itens */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Itens/Serviços</CardTitle>

            
            <Button variant="outline" onClick={addItem} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Adicionar Item</span>
            </Button>


          </CardHeader>
          <CardContent className="space-y-4">
            {formData.itens.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-2 items-end border-b border-gray-200 pb-2"
              >
                <div className="col-span-1">
                  <Label>Qtd.</Label>
                  <Input
                    type="text"
                    name="quantidade"
                    value={item.quantidade}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="col-span-2">
                    <Label>Unidade</Label>
                    <select
                      name="unidade"
                      value={item.unidade}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full border rounded-md px-2 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Material">Material</option>
                      <option value="Serviço">Serviço</option>
                    </select>
                  </div>
                <div className="col-span-8">
                  <Label>Descrição</Label>
                  <Input
                    type="text"
                    name="descricao"
                    value={item.descricao}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-1 flex justify-end pt-6">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={formData.itens.length === 1}
                    aria-label={`Remover item ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            className="bg-green-800 text-white hover:bg-green-700 px-6 py-3 flex items-center justify-center space-x-2 w-auto text-base"
            onClick={generateExcel}
          >
            <FileText className="h-6 w-6" />
            <span>Gerar DFD</span>
          </Button>

     
        </div>
      </div>
    </div>
  );
};

export default Gerador;
