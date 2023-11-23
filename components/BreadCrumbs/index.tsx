import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

interface BreadCrumbsProps {
  routes?:{ 
    name: string;
    link: string;
  }[]
}

const BreadCrumbs = (props: BreadCrumbsProps) => {
  const linkMapper = props?.routes?.map((route, index) => {
    const { name, link } = route;
    const color = props?.routes && index === props.routes.length - 1 ? 'text.primary' : 'inherit';
    return(
    <Link key={index} underline="hover" color={ color } href={ link }>
      { name }
    </Link>)
  });

  return(
    <Breadcrumbs aria-label="breadcrumb" sx={{
      marginTop: '72px',
      marginBottom: '20px',
    }}>
      <Link 
        underline="hover" 
        color={ linkMapper ? 'inherit' : 'text.primary '}
        href="/">
        Home
      </Link>
      { linkMapper }
    </Breadcrumbs>
  )
};

export default BreadCrumbs;