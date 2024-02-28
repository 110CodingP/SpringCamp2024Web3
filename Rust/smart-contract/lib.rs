#![cfg_attr(not(feature = "std"), no_std, no_main)]
#[ink::contract]
use ink::prelude::vec::Vec;
use scale::{Decode, Encode};
mod NftMarket {
    #[ink(storage)]
    pub struct NftMarket {
        nfts: Vec<Nft>,
    }
    #[derive(Encode, Decode, Debug, Clone)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Nft {
        id:u32,
        owner:AccountId,
        price:u32,
    }
    impl Nft {
        fn new(
            id:u32,
            owner:AccountId,
            price:u32,)-> Self {
            Self {
                id,owner,price
            }
        }
    }
    #[ink(event)]
    pub struct nfts_rn {
        #[ink(topic)]
        nfts: Vec<Nft>;
    }
    impl NftMarket {
        #[ink(contstructor)]
        pub fn new()-> Self {
            let nfts:Vec<Nft>= Vec::new();
            Self {
                nfts
            }
        }
    }
        #[ink(message,payable)]
        pub fn add_nft(&mut self,id,owner,price) {
            let nft:Nft=Nft::new(id,owner,price)
            self.nfts.push(nft);
            self.env().emit_event(
                nfts_rn {
                    nfts:self.nfts
                }
            );
        }
}