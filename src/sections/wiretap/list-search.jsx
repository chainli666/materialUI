import { useState, useEffect } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import { Box, Grid, Button, TextField, MenuItem, Collapse } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function ProductTableSearchFilters({ filters, onSearch, open, onToggle }) {
  const { state, setState } = filters;
  const [localFilters, setLocalFilters] = useState(state); //替換為 本地暫存的狀態（例如 local state），而不是直接修改父層的 filters.state

  // 讓父層 reset filters 時同步 localFilters
  useEffect(() => {
    setLocalFilters(state);
  }, [state]);

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Button size="small" onClick={onToggle} startIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
          {open ? '收起搜尋條件' : '展開搜尋條件'}
        </Button>
      </Box>

      <Collapse in={open}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Product"
              value={localFilters.name}
              onChange={(e) => setLocalFilters({ ...localFilters, name: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <DatePicker
              label="Created At"
              value={localFilters.createdAt}
              onChange={(newDate) => setLocalFilters((prev) => ({ ...prev, createdAt: newDate }))}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              select
              fullWidth
              label="Stock"
              SelectProps={{ multiple: true }}
              value={localFilters.stock}
              onChange={(e) => setLocalFilters((prev) => ({ ...prev, stock: e.target.value }))}
            >
              {['low stock', 'out of stock', 'in stock'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Price ≥"
              type="number"
              value={localFilters.priceMin}
              onChange={(e) => setLocalFilters((prev) => ({ ...prev, priceMin: e.target.value }))}
              />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              select
              fullWidth
              label="Publish"
              SelectProps={{ multiple: true }}
              value={localFilters.publish}
              onChange={(e) => setLocalFilters((prev) => ({ ...prev, publish: e.target.value }))}
              >
              {['published', 'draft'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ height: '100%' }}
              onClick={() => {
                onSearch(localFilters);
              }}
            >
              搜尋
            </Button>
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
}
