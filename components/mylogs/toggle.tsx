import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import styled from 'styled-components';

const Toggle = () => {
  const router = useRouter();
  const { query } = router;
  const onPush = useCallback(() => {
    router.push('/mylogs/create');
  }, [router]);
  const color = useMemo(
    () =>
      query?.tab === 'wrap' || query?.tab === 'nowrap' ? '#B2B3B6' : '#fff',
    [query]
  );
  return (
    <ToggleBase onClick={onPush}>
      <svg
        width="52.25"
        height="52.25"
        viewBox="0 0 70 70"
        fill="current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35 0C15.6705 0 0 15.6705 0 35C0 54.3295 15.6705 70 35 70C54.3295 70 70 54.3295 70 35C70 15.6705 54.3295 0 35 0ZM38.1818 47.7273C38.1818 48.5711 37.8466 49.3805 37.2499 49.9772C36.6532 50.5739 35.8439 50.9091 35 50.9091C34.1561 50.9091 33.3468 50.5739 32.7501 49.9772C32.1534 49.3805 31.8182 48.5711 31.8182 47.7273V38.1818H22.2727C21.4289 38.1818 20.6195 37.8466 20.0228 37.2499C19.4261 36.6532 19.0909 35.8439 19.0909 35C19.0909 34.1561 19.4261 33.3468 20.0228 32.7501C20.6195 32.1534 21.4289 31.8182 22.2727 31.8182H31.8182V22.2727C31.8182 21.4289 32.1534 20.6195 32.7501 20.0228C33.3468 19.4261 34.1561 19.0909 35 19.0909C35.8439 19.0909 36.6532 19.4261 37.2499 20.0228C37.8466 20.6195 38.1818 21.4289 38.1818 22.2727V31.8182H47.7273C48.5711 31.8182 49.3805 32.1534 49.9772 32.7501C50.5739 33.3468 50.9091 34.1561 50.9091 35C50.9091 35.8439 50.5739 36.6532 49.9772 37.2499C49.3805 37.8466 48.5711 38.1818 47.7273 38.1818H38.1818V47.7273Z"
          fill={color}
        />
      </svg>
    </ToggleBase>
  );
};

export default Toggle;

const ToggleBase = styled.div`
  position: fixed;
  bottom: 7.711rem;
  right: 0.984rem;
  cursor: pointer;
`;
