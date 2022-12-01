import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SecurityIcon from '@material-ui/icons/Security';
import { object } from 'q3-ui-helpers';
import axios from 'axios';
import notistack from 'q3-ui-forms/lib/providers/notistack';
import { useTranslation } from 'q3-ui-locale';

const useUserLoginActions = ({
  email,
  id,
  verified = false,
}) => {
  const n = notistack();
  const { t } = useTranslation('descriptions');

  const generatePassword = () =>
    object.noop(
      axios
        .post('/password-generate', {
          id,
        })
        .then((resp) => {
          // eslint-disable-next-line
          prompt(
            t('passwordGenerated'),
            resp?.data?.credentials,
          );
        }),
    );

  const sendPasswordResetEmail = () =>
    object.noop(
      axios
        .post('/password-reset?acknowledge=true', {
          email,
        })
        .then(() =>
          n.onSuccess(t('passwordResetEmailSent')),
        ),
    );

  const sendReverificationEmail = () =>
    object.noop(
      axios
        .post('/reverify', {
          email,
        })
        .then(() =>
          n.onSuccess(t('reverificationEmailSent')),
        ),
    );

  return verified
    ? [
        {
          label: 'sendPasswordResetEmail',
          icon: VpnLockIcon,
          onClick: sendPasswordResetEmail,
        },
        {
          label: 'generateNewPassword',
          icon: LockOpenIcon,
          onClick: generatePassword,
        },
      ]
    : [
        {
          label: 'verifyAndGeneratePassword',
          icon: VerifiedUserIcon,
          onClick: generatePassword,
        },
        {
          label: 'resendVerificationEmail',
          icon: SecurityIcon,
          onClick: sendReverificationEmail,
        },
      ];
};

export default useUserLoginActions;
