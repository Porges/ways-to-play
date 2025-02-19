use std::iter::Chain;

pub struct NVec<const N: usize, T>(Vec<T>);

impl<const N: usize, T> From<NVec<N, T>> for Vec<T> {
    fn from(value: NVec<N, T>) -> Self {
        value.0
    }
}

impl<const N: usize, T> TryFrom<Vec<T>> for NVec<N, T> {
    type Error = ();

    fn try_from(value: Vec<T>) -> Result<Self, Self::Error> {
        if value.len() != N {
            Err(())
        } else {
            Ok(Self(value))
        }
    }
}

macro_rules! nvec {
    [$x:expr] => {
        NVec::<1, _>(vec![$x])
    };
    [$x:expr, $y:expr] => {
        NVec::<2, _>(vec![$x, $y])
    };
    [$x:expr, $y:expr, $z:expr] => {
        NVec::<3, _>(vec![$x, $y, $z])
    };
}

impl<const N: usize, T> NVec<N, T> {
    pub fn new() -> Self {
        Self(Vec::with_capacity(N))
    }
}

impl<const N: usize, A: Default> Default for NVec<N, A> {
    fn default() -> Self {
        Self::new()
    }
}

pub type OneOrMore<'a, A> = AtLeast<'a, 1, A>;

pub struct AtLeast<'a, const N: usize, A> {
    head: &'a [A; N],
    tail: &'a [A],
}

impl<const N: usize, A> AtLeast<'_, N, A> {
    pub fn len(&self) -> usize {
        self.head.len() + self.tail.len()
    }
}

impl<'a, const N: usize, A> TryFrom<&'a [A]> for AtLeast<'a, N, A> {
    type Error = ();

    fn try_from(value: &'a [A]) -> Result<Self, Self::Error> {
        match value.split_at_checked(N) {
            Some((head, tail)) => Ok(AtLeast {
                head: head.try_into().unwrap(),
                tail,
            }),
            None => Err(()),
        }
    }
}

impl<'a, const N: usize, A> IntoIterator for AtLeast<'a, N, A> {
    type Item = &'a A;
    type IntoIter = Chain<std::slice::Iter<'a, A>, std::slice::Iter<'a, A>>;

    fn into_iter(self) -> Self::IntoIter {
        self.head.iter().chain(self.tail.iter())
    }
}
