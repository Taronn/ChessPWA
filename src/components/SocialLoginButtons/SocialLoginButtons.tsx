import { Button } from 'framework7-react';
import {useEnvVars} from "../../hooks/useEnvVars";

export function SocialLoginButtons() {
  const {authServerURL} = useEnvVars();
  return (
    <div className="margin-horizontal">
      <hr />
      <div className="grid grid-cols-3 margin">
        <Button small iconF7="logo_instagram" href={`${authServerURL}/auth/facebook`} external>
          Instagram
        </Button>
        <Button small iconF7="logo_facebook" href={`${authServerURL}/auth/facebook`} external>
          Facebook
        </Button>
        <Button small iconF7="logo_google" href={`${authServerURL}/auth/google`} external>
          Google
        </Button>
      </div>
      <hr />
    </div>
  );
}
