import { Button } from 'framework7-react';

export function SocialLoginButtons() {
  return (
    <div className="margin-horizontal">
      <hr />
      <div className="grid grid-cols-3 margin">
        <Button small iconF7="logo_instagram">
          Instagram
        </Button>
        <Button small iconF7="logo_facebook">
          Facebook
        </Button>
        <Button small iconF7="logo_google">
          Google
        </Button>
      </div>
      <hr />
    </div>
  );
}
