import { Link } from 'framework7-react';
import { LogoLinkProps } from './types';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../redux/slices/appSettingsSlice';
import { useMemo } from 'react';

export function LogoLink({
  size,
  darkModeFill = 'white',
  lightModeFill = 'black',
}: LogoLinkProps) {
  const darkMode = useSelector(selectDarkMode);
  const fill = useMemo(
    () => (darkMode ? darkModeFill : lightModeFill),
    [darkMode]
  );
  return (
    <Link back color={fill}>
      <svg
        fill={fill}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 205.482 205.482"
      >
        <g>
          <path
            d="M188.03,113.487c-21.775,11.727-23.851-9.635-23.851-9.635c-18.021-2.093-31.403-22.201-31.403-22.201
		c-24.312,12.558-10.752,47.996-0.284,61.603c1.396,1.809,2.494,3.747,3.417,5.745h17.354v25.215h24.045v31.269H11.865v-31.269
		h24.048v-25.215h17.067c-20.803-26.351-15.392-51.211-9.422-67.664C50.767,61.52,60.511,50.644,74.718,39.07
		c21.122-17.221,60.145-19.375,60.145-19.375c0.255-1.463,1.448-3.177,2.974-4.926c-4.688,0.127-10.427,0.52-16.964,1.362
		c-4.469,0.872-9.387,1.356-14.378,2.816c-5.104,1.105-10.285,2.878-15.581,4.912c-5.29,1.974-10.489,4.775-15.628,7.692
		c-4.876,3.402-10.06,6.537-14.156,11.018c-4.702,3.83-8.127,8.819-11.645,13.586c-3.673,4.682-5.479,10.4-8.228,15.321
		c-2.039,5.249-3.177,10.666-4.714,15.617c-1.392,4.994-1.368,9.992-2.069,14.49c-0.594,4.492-1.049,8.629-0.704,12.317
		c0.116,3.688,0.195,6.928,0.278,9.563c0.156,5.297,0.254,8.335,0.254,8.335l-0.733,0.07c0,0-0.629-2.967-1.457-8.311
		c-0.393-2.671-0.877-5.923-1.41-9.682c-0.807-3.735-0.831-8.015-0.479-12.726c0.266-3.369,0.313-7.037,0.629-10.796l-8.801-0.189
		l9.014-11.032l-9.46-1.369L35.122,67.41l-9.916-3.154l13.976-7.669L28.59,53.434l18.256-5.872l-12.62-3.606L54.73,38.32
		l-11.275-5.181l20.729-2.707L54.048,24.58l25.307-2.651c0.112-0.059,0.239-0.127,0.354-0.163l-11.691-5.296l26.596-2.258L82.44,7.9
		l50.312,4.007c2.72,0.106,5.096,0.319,7.259,0.556C146.478,6.271,156.632,0,156.632,0c-2.08,2.084-2.932,13.409-2.932,13.409
		c2.099-3.771,8.795-7.542,8.795-7.542c-3.759,8.781,0,27.624,0,27.624c10.899,10.899,23.046,48.578,23.046,48.578l4.623,6.694
		C196.01,97.173,193.852,110.354,188.03,113.487z"
          />
        </g>
      </svg>
      <h2 className="margin-left-half">Chess</h2>
    </Link>
  );
}