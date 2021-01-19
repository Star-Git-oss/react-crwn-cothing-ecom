import './header.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../CartIcon/CartIcon';
import CartDropdown from '../CartDropdown/CartDropdown';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartDropdownHidden } from '../../redux/cart/cart.selectors';

function Header({currentUser, hidden}) {
    return (
        <div className='header'>
            <Link className='logo-container' to="/">
                <Logo className='logo' />
            </Link>
            <div className="options">
                <Link className='option' to='shop'>
                    SHOP
                </Link>
                <Link className='option' to='contacts'>
                    CONTACTS
                </Link>
                {currentUser ? (
                    <div className='option' onClick={() => auth.signOut()}>SIGN-OUT</div>
                ) : (
                    <Link className='option' to='login'>
                        SIGN IN
                    </Link>
                )}
                <CartIcon />
            </div>
            {hidden ? null : <CartDropdown />}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartDropdownHidden
})

export default connect(mapStateToProps)(Header);