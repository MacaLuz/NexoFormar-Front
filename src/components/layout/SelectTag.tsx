'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { obtenerCategorias } from '@/connect/categorias';

type Categoria = {
  id: number;
  nombre: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  onChange?: (selectedIds: string[]) => void; 
}

export default function MultipleSelectCheckmarks({ onChange }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    obtenerCategorias()
      .then(setCategorias)
      .catch((err) => console.error('Error al obtener categorias!', err));
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedIds(value);
    onChange?.(value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }} size="small">
      <InputLabel
        id="categorias-label"
        sx={{ color: '#93c5fd' }}
      >
        Categoria
      </InputLabel>

      <Select
        labelId="categorias-label"
        id="categorias"
        multiple
        value={selectedIds}
        onChange={handleChange}
        input={
          <OutlinedInput
            label="Categoria"
            sx={{
              color: '#93c5fd',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#93c5fd',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#93c5fd',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#93c5fd',
              },
            }}
          />
        }
        renderValue={(selected) =>
          categorias
            .filter((cat) => selected.includes(cat.id.toString()))
            .map((cat) => cat.nombre)
            .join(', ')
        }
        MenuProps={MenuProps}
        sx={{
          color: '#93c5fd',
          '.MuiSvgIcon-root': { color: '#93c5fd' },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#1c4375ff',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#93c5fd',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#93c5fd',
          },
        }}
      >
        {categorias.map((cat) => {
          const idStr = cat.id.toString();
          return (
            <MenuItem key={cat.id} value={idStr}>
              <Checkbox checked={selectedIds.includes(idStr)} />
              <ListItemText primary={cat.nombre} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
