near dev-deploy --wasmFile res/fungible_token.wasm

ID=dev-1637698879132-85915592042146
near call $ID new_steve_token --accountId $ID
near call $ID ft_metadata --accountId $ID
near call $ID claim --accountId steveyu.testnet

near call $ID get_balance --accountId $ID
# not registered
near call $ID get_balance --accountId steveyu.testnet

TXJSON='{"receiver_id": "steveyu.testnet", "amount": 10}'
near call $ID transfer $TXJSON --accountId $ID