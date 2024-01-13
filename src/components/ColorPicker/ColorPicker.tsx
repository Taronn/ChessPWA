import { Icon, List, ListInput, f7 } from 'framework7-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectColorTheme,
  setColorTheme,
} from '../../redux/slices/appSettingsSlice';

export function ColorPicker() {
  const color = useSelector(selectColorTheme);
  const dispatch = useDispatch();
  function handleColorChange(value: any) {
    dispatch(setColorTheme(value));
  }

  return (
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={color}
      onColorPickerChange={(value) => handleColorChange(value.hex)}
      //@ts-ignore
      colorPickerParams={{
        modules: ['initial-current-colors', 'rgb-sliders'],
        sliderValue: true,
        sliderLabel: true,
        targetEl: '.colors-picker-target',
        formatValue: (value) => `${value.hex}`,
      }}
    >
      <Icon
        slot="media"
        color={color.hex}
        f7="app_fill"
        className="colors-picker-target"
        style={{ cursor: 'pointer' }}
      />
    </ListInput>
  );
}
