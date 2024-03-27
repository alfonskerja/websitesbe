import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Specifications } from '@/types';

function createData(
  specs: string,
  value: string,
  unit: string,
) {
  return { specs, value, unit };
}

export default function SingleProductTable(spec: Specifications) {
    const rows = [
        createData('Nominal Impedance', spec.impedance, "Ω"),
        createData('DC Resistance, Re', spec.dc_resistance_re, "Ω"),
        createData('Voice coil inductance, Le', spec.coil_inductance_le, "mH"),
        createData('Effective piston area, Sd', spec.effective_piston_area_sd, "cm²"),
        createData('Voice coil diameter', spec.voice_coil_diameter, "mm"),
        createData('Voice coil height', spec.voice_coil_height, "mm"),
        createData('Air gap height', spec.air_gap_height, "mm"),
        createData('Linear coil travel (p-p)', spec.linear_coil_travel_pp, "mm"),
        createData('Moving mass incl. air, Mms', spec.moving_mass_mms, "g"),
        createData('Free air resonance, Fs', spec.free_air_resonance_fs, "Hz"),
        createData('Sensitivity (2.83 V / 1 m)', spec.sensitivity, "dB"),
        createData('Mechanical Q-factor, Qms', spec.mechanical_q_factor_qms, ""),
        createData('Electrical Q-factor, Qes', spec.electrical_q_factor_qes, ""),
        createData('Total Q-factor, Qts', spec.total_q_factor_qts, ""),
        createData('Force factor, Bl', spec.force_factor_bi, "Tm"),
        createData('Rated power handling*', spec.rated_power_handling, "W"),
        createData('Magnetic flux density', spec.magnetic_flux_density, "T"),
        createData('Magnet weight', spec.magnet_weight, "kg"),
        createData('Net weight', spec.net_weight, "kg"),
      ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell align="right"><b>Value</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.specs}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <b>{row.specs}</b>
              </TableCell>
              <TableCell align="right">{row.value ? row.value + " " + row.unit : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}