import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import SearchBox from './searchbox';
import Link from 'next/link';
import { ClickAwayListener, Grow, MenuList, Paper, Popper, alpha } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
  margin: '2vw  '
};


function Navbar() {
    const pathname = usePathname()
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const imagePath = pathname.includes("sbaudience") ? '/images/sbaudience/logo_sbaudience.png' : '/images/sbacoustics/logo_sbacoustics.png';
    const [openDropdown, setOpenDropdown] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
  
    const handleToggle = () => {
      setOpenDropdown((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event: Event | React.SyntheticEvent) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      setOpenDropdown(false);
    };
  
    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpenDropdown(false);
      } else if (event.key === 'Escape') {
        setOpenDropdown(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(openDropdown);
    React.useEffect(() => {
      if (prevOpen.current === true && openDropdown === false) {
        anchorRef.current!.focus();
      }
  
      prevOpen.current = openDropdown;
    }, [openDropdown]);



    const handleMenuItemClick = (url: string) => () => {
      setOpenDropdown(false);
      router.push(url, { scroll: false });
    };

return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={() => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                pathname.includes("sbaudience") ? 'rgba(0, 0, 0, 0.4)':
                   'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '2px solid',
              borderColor: 
              pathname.includes("sbaudience") ?  
              alpha('#FF0000', 0.3):
              alpha('#FF6B6B', 0.3),
              boxShadow:
              pathname.includes("sbaudience") ?  
              `0 0 24px 12px ${alpha('#FF0000', 0.1)}`:
              `0 0 12px 8px ${alpha('#FF6B6B', 0.1)}`,
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
            <a href='/'>
                <img
                    src={imagePath}
                    style={logoStyle}
                    alt="logo of SB Acoustics"
                />
            </a>
              <Box sx={{ display: { xs: 'none', md: 'flex', margin: '2vw' } }}>                              
                <div>
                        <Button
                          ref={anchorRef}
                          id="composition-button"
                          aria-controls={openDropdown ? 'composition-menu' : undefined}
                          aria-expanded={openDropdown ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle}
                        >
                         Products<ArrowDropDownIcon/>
                        </Button>
                        <Popper
                          open={openDropdown}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          placement="bottom-start"
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === 'bottom-start' ? 'left top' : 'left bottom',
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={openDropdown}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                    
                                  >
                                    <MenuItem onClick={handleMenuItemClick('/products')}>View All Products</MenuItem>
                                    <MenuItem onClick={handleMenuItemClick('/products/?categorySlug=new-products')}>New Products</MenuItem>
                                    <MenuItem onClick={handleMenuItemClick('/products/?subcategorySlug=satori')}>Satori</MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                        <Button
                          onClick={handleMenuItemClick('/distributors')}
                        >
                          Distributors
                        </Button>
                        <Button
                          onClick={handleMenuItemClick('/sbaudience')}
                        >
                          SB Audience
                        </Button>
                      </div>


              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <SearchBox/>
            </Box>
            {/* Mobile Menu */}
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: "white",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                  </Box>
                    <MenuItem>
                      <Link
                      key='/products'
                      href='/products'
                      className={cn(
                          "text-sm font-medium transition-colors px-5 hover:text-red-600", pathname.includes('/products') ? "text-red-600" : pathname.includes("sbaudience") ? "text-white" : "text-black"
                      )}
                      >
                          Products
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        key='/distributors'
                        href='/distributors'
                        className={cn(
                            "text-sm font-medium transition-colors px-5 hover:text-red-600", pathname.includes('/distributors') ? "text-red-600" : pathname.includes("sbaudience") ? "text-white" : "text-black"
                        )}
                      >
                          Distributors
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        key='/sbaudience'
                        href='/sbaudience'
                        className={cn(
                            "text-sm font-medium transition-colors px-5 hover:text-red-600", pathname.includes('/sbaudience') ? "text-red-600" : pathname.includes("sbaudience") ? "text-white" : "text-black"
                        )}
                      >
                          SB Audience
                      </Link>
                    </MenuItem>
                  <Divider />
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
