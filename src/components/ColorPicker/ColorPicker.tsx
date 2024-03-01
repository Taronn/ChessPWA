import { Icon, ListInput } from 'framework7-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectColorTheme,
  setColorTheme,
} from '../../redux/slices/appSettingsSlice';
import { useIsnFetch } from '../../hooks/useFetch';

export function ColorPicker() {
  const {patch} = useIsnFetch('/settings/me');
  let timeoutId: NodeJS.Timeout | null = null;
  const color = useSelector(selectColorTheme);
  const dispatch = useDispatch();
  async function handleColorChange(value: any) {
    dispatch(setColorTheme(value));
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(async () => await patch({ColorTheme: value}), 2000);
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
