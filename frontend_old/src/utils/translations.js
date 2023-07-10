import frenchkiss, { locale, fallback, set, onMissingKey } from 'frenchkiss';

set('fr', {
    hello: 'Bonjour, ',
    signin: {
        text: 'Entrer vos identifiants',
        form: {
            username: 'Identifiant',
            motDePasse: 'Mot de passe',
            btnLogin: 'Se connecter',
            error: 'Mauvaise combinaison de mot de passe'
        },
        navigateToSignUp1: 'Vous n\'avez pas de compte ?',
        navigateToSignUp2: 'Créer le',
        navigateToSignUp3: 'en 3 minutes'
    },
    signup: {
        text: 'Créez un compte. C\'est simple et gratuit',
        form: {
            firstName: 'Prénom',
            lastName: 'Nom',
            username: 'Identifiant',
            email: 'E-mail',
            motDePasse: 'Mot de passe',
            motDePasseConfirmation: 'Confirmation de mot de passe',
            btnRejoindre: 'Rejoindre'
        },
        cgvText1: 'En adhérant, vous acceptez les',
        cgvText2: 'Conditions',
        cgvText3: 'et la',
        cgvText4: 'Politique de confidentialité',
        navigateToSignin: 'Vous avez déjà un compte ?'
    }
});

set('en', {
    hello: 'Hi, ',
    signin: {
        text: 'Entrer vos identifiants',
        form: {
            username: 'Identifiant',
            motDePasse: 'Mot de passe',
            btnLogin: 'Se connecter',
            error: 'Mauvaise combinaison de mot de passe'
        },
        navigateToSignUp1: 'Vous n\'avez pas de compte ?',
        navigateToSignUp2: 'Créer le',
        navigateToSignUp3: 'en 3 minutes'
    },
    signup: {
        text: 'Créez un compte. C\'est simple et gratuit',
        form: {
            firstName: 'Prénom',
            lastName: 'Nom',
            username: 'Identifiant',
            email: 'E-mail',
            motDePasse: 'Mot de passe',
            motDePasseConfirmation: 'Confirmation de mot de passe',
            btnRejoindre: 'Rejoindre'
        },
        cgvText1: 'En adhérant, vous acceptez les',
        cgvText2: 'Conditions',
        cgvText3: 'et la',
        cgvText4: 'Politique de confidentialité',
        navigateToSignin: 'Vous avez déjà un compte ?'
    }
});

locale('fr');
fallback('en');

onMissingKey((key) => {
    return `An error happened (${key})`;
});

export default frenchkiss;
