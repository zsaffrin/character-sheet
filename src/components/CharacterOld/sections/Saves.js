import React from 'react';

const Saves = ({ saves }) => (
  <>
    <table>
      <tbody>
        <tr>
          <td>
            <strong>FORTITUDE</strong>
          </td>
          <td>{saves.fort}</td>
        </tr>
        <tr>
          <td>
            <strong>REFLEX</strong>
          </td>
          <td>{saves.reflex}</td>
        </tr>
        <tr>
          <td>
            <strong>WILL</strong>
          </td>
          <td>{saves.will}</td>
        </tr>
      </tbody>
    </table>
  </>
);

export default Saves;
